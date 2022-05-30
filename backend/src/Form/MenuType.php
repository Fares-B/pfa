<?php

namespace App\Form;

use App\Entity\CategoryMenu;
use App\Entity\Ingredient;
use App\Entity\Menu;
use App\Repository\CategoryMenuRepository;
use App\Repository\IngredientRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->user = $options['user'];
        $builder
            ->add('name', TextType::class, [
                "label" => "Nom",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('category', EntityType::class, [
                'class' => CategoryMenu::class,
                'query_builder' => function (CategoryMenuRepository $a) {
                    return $a->createQueryBuilder('cm')
                        ->where('cm.user = :userId')
                        ->setParameter('userId', $this->user)
                    ;
                },
                'choice_label' => 'name',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Catégory',
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('ingredients', EntityType::class, [
                'class' => Ingredient::class,
                 'query_builder' => function (IngredientRepository $a) {
                    return $a->createQueryBuilder('i')
                        ->where('i.id IN(:ids)')
                        ->setParameter('ids', $this->user->getIngredients())
                    ;
                },
                'choice_label' => 'name',
                'multiple' => true,
                'expanded' => true,
                'label' => 'Ingrédients',
                "label_attr" => ["class" => "mr-4"],
                'attr' => ['class' => 'form-check form-check-inline'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Menu::class,
            'user' => null,
        ]);
    }
}
